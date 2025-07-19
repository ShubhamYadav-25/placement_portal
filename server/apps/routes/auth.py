from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from .. import db
from ..models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST','GET'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'msg': 'Email already exists'}), 409

    hashed_pw = generate_password_hash(data['password'])
    user = User(name=data['name'], email=data['email'], password=hashed_pw, role=data['role'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'User registered'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'msg': 'Invalid credentials'}), 401

    token = create_access_token(identity={'id': user.id, 'role': user.role})
    return jsonify({'token': token, 'name': user.name, 'role': user.role})
