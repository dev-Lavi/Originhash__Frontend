import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import JavaScript from "../assets/courses/javascript.jpg";
import react from "../assets/courses/react.jpg";
import sql from "../assets/courses/sql.jpg";
import kotlin from "../assets/courses/kotlin.jpg";

const mockCourses = [
  { id: 1, title: 'Complete JavaScript', thumbnail: JavaScript, creator: 'Dr. Angela Yu', rating: 4.8, reviews: 1234 },
  { id: 2, title: 'Complete ReactJS', thumbnail: react, creator: 'Dr. Angela Yu', rating: 4.9, reviews: 987 },
  { id: 3, title: 'Complete SQL', thumbnail: sql, creator: 'Dr. Angela Yu', rating: 4.7, reviews: 2341 },
  { id: 4, title: 'Complete Kotlin', thumbnail: kotlin, creator: 'Dr. Angela Yu', rating: 4.9, reviews: 1567 }
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={styles.mainContent}>
      <section className={styles.services}>
        <h2>
          Range of <span>Our Services</span>
        </h2>
        <p>Click on any card below to know more about the service</p>

        <h3>Recommended courses</h3>
        <div className={styles.courseGrid}>
          {loading
            ? Array(4).fill(0).map((_, idx) => (
                <div key={idx} className={`${styles.courseCard} ${styles.skeletonCard}`}>
                  <div className={styles.skeletonThumbnail}></div>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonTextShort}></div>
                  <div className={styles.skeletonButton}></div>
                </div>
              ))
            : courses.map(course => (
                <div key={course.id} className={styles.courseCard}>
                  <img src={course.thumbnail} alt={course.title} />
                  <div className={styles.courseInfo}>
                    <h4>{course.title}</h4>
                    <p>{course.creator}</p>
                    <div className={styles.rating}>
                      {'★'.repeat(Math.floor(course.rating))}
                      <span>({course.reviews})</span>
                    </div>
                    <button className={styles.knowMore}>Know more</button>
                  </div>
                </div>
              ))
          }
        </div>


        <h3>Most Watched</h3>
         <div className={styles.courseGrid}>
          {loading
            ? Array(4).fill(0).map((_, idx) => (
                <div key={idx} className={`${styles.courseCard} ${styles.skeletonCard}`}>
                  <div className={styles.skeletonThumbnail}></div>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonTextShort}></div>
                  <div className={styles.skeletonButton}></div>
                </div>
              ))
            : courses.map(course => (
                <div key={course.id} className={styles.courseCard}>
                  <img src={course.thumbnail} alt={course.title} />
                  <div className={styles.courseInfo}>
                    <h4>{course.title}</h4>
                    <p>{course.creator}</p>
                    <div className={styles.rating}>
                      {'★'.repeat(Math.floor(course.rating))}
                      <span>({course.reviews})</span>
                    </div>
                    <button className={styles.knowMore}>Know more</button>
                  </div>
                </div>
              ))
          }
        </div>

        <div className={styles.viewMore}>
          <a href="#">click here to know more</a>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
