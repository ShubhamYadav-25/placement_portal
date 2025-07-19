def extract_skills(text):
    skill_keywords = [
        'Python', 'Java', 'C++', 'Flask', 'Django', 'SQL',
        'HTML', 'CSS', 'JavaScript', 'React',
        'TensorFlow', 'Pandas', 'NumPy', 'Machine Learning'
    ]
    found_skills = []

    for skill in skill_keywords:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    return found_skills
