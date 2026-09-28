"use client";

import { motion } from "framer-motion";
import SceneBackground from "../backgrounds/SceneBackground";
import { patientReviews, reviewsSource } from "../../content/reviews";
import { useMotionPreference } from "../motion/MotionProvider";

function ReviewCard({ review, duplicate = false }) {
  return <a className="reviews-wall__card" href={reviewsSource.url} target="_blank" rel="noopener noreferrer" tabIndex={duplicate ? -1 : undefined} aria-hidden={duplicate || undefined} aria-label={duplicate ? undefined : `Read ${review.name}'s full review on Google Maps`}>
    <span className="reviews-wall__pin" aria-hidden="true" />
    <span className="reviews-wall__stars" aria-label="Five out of five stars">★★★★★</span>
    <p>{review.summary}</p>
    <span className="reviews-wall__byline"><span className="reviews-wall__avatar" aria-hidden="true">{review.initials}</span><span><strong>{review.name}</strong><small>Google review · summary</small></span><span className="reviews-wall__arrow" aria-hidden="true">↗</span></span>
  </a>;
}

function ReviewRow({ reviews, reverse = false }) {
  return <div className="reviews-wall__row">
    <div className="reviews-wall__rope" aria-hidden="true" />
    <div className={`reviews-wall__track${reverse ? " reviews-wall__track--reverse" : ""}`}>
      {[false, true].map(duplicate => <div className="reviews-wall__set" key={duplicate ? "copy" : "original"} aria-hidden={duplicate || undefined}>
        {reviews.map(review => <ReviewCard key={review.name} review={review} duplicate={duplicate} />)}
      </div>)}
    </div>
  </div>;
}

export default function ReviewsWall() {
  const { motionPaused } = useMotionPreference();
  return <section id="reviews" className={`reviews-wall${motionPaused ? " reviews-wall--paused" : ""}`} aria-labelledby="reviews-title">
    <SceneBackground preset="gallery" />
    <div className="reviews-wall__ambient" aria-hidden="true"><i /><i /><i /><svg viewBox="0 0 1400 560" preserveAspectRatio="none"><path d="M-80 305 C230 70 415 95 635 300 C830 490 1075 470 1470 155" /><path d="M-70 410 C220 195 420 160 635 360 C850 550 1090 540 1480 285" /></svg></div>
    <div className="wrap reviews-wall__header">
      <motion.div initial={motionPaused ? false : { opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
        <p className="eyebrow">Patient voices</p>
        <h2 id="reviews-title">Good things travel<br/><em>by word of mouth.</em></h2>
        <p>Real feedback from people who visited Dental Nation in Chinchinim.</p>
      </motion.div>
      <a className="reviews-wall__score" href={reviewsSource.url} target="_blank" rel="noopener noreferrer" aria-label={`${reviewsSource.rating} out of 5 from ${reviewsSource.count} Google reviews; read the reviews`}>
        <strong>{reviewsSource.rating}</strong><span><span aria-hidden="true">★★★★★</span><small>{reviewsSource.count} Google reviews</small></span>
      </a>
    </div>
    <div className="reviews-wall__rows" aria-label="Selected patient review highlights">
      <ReviewRow reviews={patientReviews.slice(0, 5)} />
      <ReviewRow reviews={patientReviews.slice(5)} reverse />
    </div>
    <div className="wrap reviews-wall__footer"><p>Cards summarise public reviews. See each patient’s original words on Google Maps. Rating checked {reviewsSource.checked}.</p><a className="text-link" href={reviewsSource.url} target="_blank" rel="noopener noreferrer">Read all Google reviews <b aria-hidden="true">↗</b></a></div>
  </section>;
}
