from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os

from .. import db
from ..models import Resume
from ..utils.ocr import extract_text_from_pdf
from ..utils.skills import extract_skills

resume_bp = Blueprint('resume', __name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@resume_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_resume():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        resume_text = extract_text_from_pdf(filepath)
    except Exception as e:
        return jsonify({'error': 'OCR failed', 'details': str(e)}), 500

    skills = extract_skills(resume_text)
    user_id = get_jwt_identity()['id']
    resume = Resume(user_id=user_id, text=resume_text, skills=', '.join(skills))
    db.session.add(resume)
    db.session.commit()

    return jsonify({'message': 'Resume processed', 'skills': skills}), 200
