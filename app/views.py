from flask import jsonify, request
from app.models import Review
from datetime import date

def index():
    return jsonify({
        'mensaje': 'Bienvenido a la API de Reviews de Guitarras'
    })


def get_reviews():
    reviews = Review.get_all()
    return jsonify([review.serialize() for review in reviews])

def get_review(review_id):
    review = Review.get_by_id(review_id)
    if not review:
        return jsonify({'message': 'Review not found'}), 404
    return jsonify(review.serialize())

def create_review():
    data = request.json
    new_review = Review(
        guitar_model=data['guitar_model'],
        brand=data['brand'],
        rating=data['rating'],
        reviewer_name=data['reviewer_name'],
        review_date=date.today().strftime('%Y-%m-%d'),
        pros=data.get('pros', ''),
        cons=data.get('cons', ''),
        comments=data.get('comments', '')
    )
    new_review.save()
    return jsonify({'message': 'Review created successfully'}), 201


'''

def update_review(review_id):
    review = Review.get_by_id(review_id)
    if not review:
        return jsonify({'message': 'Review not found'}), 404
    data = request.json
    review.guitar_model = data['guitar_model']
    review.brand = data['brand']
    review.rating = data['rating']
    review.reviewer_name = data['reviewer_name']
    review.review_date = data['review_date']
    review.pros = data.get('pros', '')
    review.cons = data.get('cons', '')
    review.comments = data.get('comments', '')
    review.save()
    return jsonify({'message': 'Review updated successfully'})

def delete_review(review_id):
    review = Review.get_by_id(review_id)
    if not review:
        return jsonify({'message': 'Review not found'}), 404
    review.delete()
    return jsonify({'message': 'Review deleted successfully'})

    '''