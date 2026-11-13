# User-supplied hero motion video

Source: `C:\Users\ADMIN\Downloads\Merge_images_into_video_7bd6127a.mp4`, supplied by the user for the hero on 2026-11-12.

The approximately 10-second, 1280 x 720, 24 fps clip contains the women walking toward the bench and sitting. The full visual sequence is used. Its original transitions and visible source marks remain; the website adds no crossfades, motion interpolation, or generated frames.

Browser assets:

- `hero-walk-user.mp4`: H.264 at the source resolution and frame rate, CRF 18, all keyframes, fast-start metadata, no audio.
- `hero-walk-user.webm`: VP9 alternative at the same resolution and frame rate, CRF 26, all keyframes, no audio.
- `hero-walk-user-poster.webp`: the video's first frame.

Every frame is a keyframe so forward and backward scroll seeking does not require decoding a long chain of earlier frames. Video stays muted and paused; native scroll progress selects its currentTime. A 100 ms response eases abrupt scroll changes, and the latest requested time is applied after pending seeks complete. The final decoded frame holds before the archive enters. Replay returns to the first frame.

Video loads when the hero is approached. Direct footer visits and reduced-motion visits do not load the video sources. Reduced motion keeps the original static opening. Media errors retain the existing generated-showroom and seated-scene fallback. Native HTML renders the story captions.

The previous six generated still poses and obsolete reference clips were removed during project cleanup. The original download was not modified.

Validation: `.reference/check-hero-user-video.cjs` covers real intermediate frames on small scroll changes, exact reverse-frame recovery, the seated endpoint, paused and muted playback, replay, 320/390/768 pixel layouts, reduced motion, failed-media fallback, WebM fallback, lazy loading and page errors.
