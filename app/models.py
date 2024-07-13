from app.database import get_db
from datetime import date

class Review:
    def __init__(self, id_review=None, guitar_model=None, brand=None, rating=None, reviewer_name=None, review_date=None, pros=None, cons=None, comments=None):
        self.id_review = id_review
        self.guitar_model = guitar_model
        self.brand = brand
        self.rating = rating
        self.reviewer_name = reviewer_name
        self.review_date = review_date
        self.pros = pros
        self.cons = cons
        self.comments = comments

    @staticmethod
    def __get_reviews_by_query(query):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()

        reviews = []

        for row in rows:
            reviews.append(
                Review(
                    id_review=row[0],
                    guitar_model=row[1],
                    brand=row[2],
                    rating=row[3],
                    reviewer_name=row[4],
                    review_date=row[5],
                    pros=row[6],
                    cons=row[7],
                    comments=row[8]
                )
            )
        
        cursor.close()
        return reviews

    @staticmethod
    def get_all():
        return Review.__get_reviews_by_query(
            '''
            SELECT * FROM reviews
            ORDER BY review_date DESC
            '''
        )
    
    # @staticmethod
    # def get_by_id(id_review):
    #     db = get_db()
    #     cursor = db.cursor()
    #     cursor.execute("SELECT * FROM reviews WHERE id = %s", (id_review,))
    #     row = cursor.fetchone()
    #     cursor.close()

    #     if row:
    #         return Review(
    #                 id_review=row[0],
    #                 guitar_model=row[1],
    #                 brand=row[2],
    #                 rating=row[3],
    #                 reviewer_name=row[4],
    #                 review_date=row[5],
    #                 pros=row[6],
    #                 cons=row[7],
    #                 comments=row[8]
    #         )
        
    #     return None
    
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_review: # actualizar review existente
            cursor.execute(
                '''
                UPDATE reviews
                SET guitar_model = %s, brand = %s, rating = %s, reviewer_name = %s, review_date = %s, pros = %s, cons = %s, comments = %s
                WHERE id = %s
                ''',
                (self.guitar_model, self.brand, self.rating, self.reviewer_name, self.review_date, self.pros, self.cons, self.comments, self.id_review)
            )
        else:   # crear nueva review
            cursor.execute(
                '''
                INSERT INTO reviews (guitar_model, brand, rating, reviewer_name, review_date, pros, cons, comments)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ''',
                (self.guitar_model, self.brand, self.rating, self.reviewer_name, self.review_date, self.pros, self.cons, self.comments)
            )
            self.id_review = cursor.lastrowid
        db.commit()
        cursor.close()

    # # eliminar una review
    # def delete(self):   
    #     db = get_db()
    #     cursor = db.cursor()
    #     cursor.execute("DELETE FROM reviews WHERE id = %s", (self.id_review,))
    #     db.commit()
    #     cursor.close()

    def serialize(self):
        return {
            'id': self.id_review,
            'guitar_model': self.guitar_model,
            'brand': self.brand,
            'rating': self.rating,
            'reviewer_name': self.reviewer_name,
            'review_date': self.review_date.strftime('%Y-%m-%d') if self.review_date else None,
            'pros': self.pros,
            'cons': self.cons,
            'comments': self.comments
        }