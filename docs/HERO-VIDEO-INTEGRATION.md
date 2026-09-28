# Opening film and homepage

The owner-supplied FPV teeth clip is the **full-screen opening experience**, like the forest introduction in the Dolphin Aquarium reference. It is not the homepage hero background. The opening plays once per browser tab session before the homepage appears; `/?intro` previews it again. Visitors can skip, and visitors using reduced motion can choose whether to watch it. The page renders without a blocking overlay until JavaScript is ready, so a script failure cannot trap the visitor on the opening screen. Playback errors close the film, and a 12-second safety limit closes a stalled intro. A saved pause-motion preference skips the automatic film.

The web edit starts 1.75 seconds into the source to avoid the decorated palate, crops the fixed corner star, removes audio, and preserves the continuous flight in an 8.25-second H.264 MP4. The owner’s source in Downloads is unchanged. The film and matching first-frame poster are at `public/media/hero/dental-fpv-desktop.mp4` and `public/media/hero/dental-fpv-poster.webp`.

The homepage hero uses Dental Nation’s official reception photograph, `public/images/clinic/official/gallery-09.jpg`, with HTML text and buttons. The rest of the homepage has 15 further sections, including animated editorial and photography chapters. Film configuration is in `content/hero.js`; opening behavior is in `components/media/OpeningExperience.jsx`.

This film remains a review candidate. If the owner creates a later cut, replace the MP4 and its first-frame poster together to avoid a visible frame jump.
