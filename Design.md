# WebGL Work Showcase Website Design

## Overview
- **Motion Style**: Cyber-Kinetic Brutalism with WebGL Distortion
- **Animation Intensity**: Ultra-Dynamic
- **Technology Stack**: WebGL (Three.js/OGL), GSAP ScrollTrigger, GLSL Shaders
- **Visual Signature**: High-contrast red/black palette with liquid displacement effects

## Brand Foundation
- **Colors**:
  - Primary Red: #ff0000
  - Pure Black: #000000
  - Pure White: #ffffff
  - Dark Gray: #171717
  - Medium Gray: #6d6d6d
  - Light Gray: #c2c2c2
  - Background Dark: #0a0a0a
- **Typography**:
  - Display: "Bebas Neue", sans-serif
  - Body: "Montserrat Variablefont Wght", sans-serif
- **Core Message**: Unapologetic digital dominance through cutting-edge design
- **Font Family**: Bebas Neue (Headings), Montserrat (Body)

## Global Motion System

### Animation Timing
- **Easing Library**:
  - `expo.out` (0.16, 1, 0.3, 1) for entrances
  - `circ.inOut` (0.85, 0, 0.15, 1) for transitions
  - Custom `cubic-bezier(0.77, 0, 0.175, 1)` for layout shifts
- **Duration Scale**:
  - Micro-interactions: 200ms
  - Layout transitions: 800ms
  - Ambient cycles: 12000ms
- **Stagger Patterns**: 0.05s per character for text, 0.1s per element for grids

### Continuous Effects
- **Section-Specific Effects**: WebGL liquid distortion on image hover
- **Purposeful Motion**: Elements float with noise-based trajectories
- **Living Textures**: Subtle grain overlay (opacity 0.03) to unify the dark aesthetic

### Scroll Engine
- **Physics**: Momentum-based scrolling (lenis.js or similar)
- **Parallax**: Multi-layer depth (0.2x to 1.5x speed variance)
- **Pinning**: Section headers pin while content flows past

## Section 1: Hero

### Layout
**"The Shattered Viewport"**
A revolutionary break from the standard hero. The viewport is treated as a fluid surface. The massive headline text is split by the central image, creating a depth illusion where the image floats *between* the text layers in 3D space.

#### Spatial Composition
- **Z-Index Strategy**: Background Shader (-1) > Back Text (1) > Hero Image (2) > Front Text (3) > Navigation (10)
- **Grid**: Full-screen absolute positioning with centered focal point
- **Overflow**: Hidden, with text bleeding off-screen

### Content
- **Headline**: "WORK" (Split into "W" and "ORK")
- **Subtext**: "A showcase of digital excellence"

### Images
**Hero Background Image**
- **Resolution**: High-res portrait
- **Aspect Ratio**: 4:5
- **Transparent Background**: No
- **Visual Style**: Black and white studio portrait
- **Subject**: Young adult male, early 20s, neutral expression
- **Color Palette**: Monochrome grayscale
- **Generation Prompt**: "A black and white studio portrait of a young adult male with short, curly hair and light facial hair, wearing a plain dark t-shirt. The subject faces the camera with a neutral, serious expression. The background is a solid, very light gray or white, with soft, even lighting that minimizes shadows and creates a calm, introspective mood. The composition is centered, head-and-shoulders, with the subject sharply in focus and no visible props or distractions."

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Hero Image | Scale & Reveal | Scale 1.4 → 1.0 | 1.2s | 0s | expo.out |
| Text "W" | Slide & Clip | x: -100% → 0% | 1.0s | 0.2s | expo.out |
| Text "ORK" | Slide & Clip | x: 100% → 0% | 1.0s | 0.2s | expo.out |
| Background | Shader Bloom | Brightness 0 → 1 | 2.0s | 0s | linear |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Hero Image | Parallax | Top | Bottom | y: -150px |
| Scroll | Text Layers | Diverge | Top | Bottom | x: ±100px |

#### Continuous Animations
- **Image Hover**: Liquid displacement shader using mouse velocity as force
- **Text**: Subtle RGB split (chromatic aberration) on the text edges

#### Interaction Effects
- **Mouse Move**: 3D tilt on the hero image (±5deg)
- **Click**: "Pulse" shockwave distortion radiating from cursor

### Advanced Effects

#### Shader Effects
**"Digital Aura"**: A custom GLSL fragment shader applied to the hero image.
- **Uniforms**: Time, MousePosition, ScrollVelocity
- **Effect**: A subtle, red-tinted glow that pulses with the image brightness, creating a "breathing" digital aura effect around the subject's silhouette.

---

## Section 2: Works (The Vortex)

### Layout
**"Infinite Cylindrical Gallery"**
Instead of a flat grid, work cards are mapped onto a massive, invisible rotating cylinder. As the user scrolls, the cylinder rotates, bringing cards into focus with 3D perspective distortion.

#### Spatial Composition
- **Perspective**: 1000px
- **Arrangement**: 3-column grid translated into 3D space
- **Rotation**: X-axis rotation driven by scroll progress

### Content
- **Headlines**: [Dynamic Project Names]
- **Descriptions**: [Project Categories]

### Images
**Work Portfolio Images (1-9)**
- **Resolution**: Various, optimized for web
- **Aspect Ratio**: 16:9 or 4:3
- **Transparent Background**: No
- **Visual Style**: Mix of web design, UI/UX, photography
- **Subject**: Diverse projects (landing pages, e-commerce, blogs)
- **Color Palette**: Varies per project

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Cards | 3D Flip Up | RotateX 90° → 0° | 0.8s | Stagger 0.1s | back.out |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Container | Rotate Cylinder | Top | Bottom | RotateX 0° → 360° |
| Scroll | Cards | Scale/Blur | Center | Edge | Scale 1→0.8, Blur 0→5px |

#### Interaction Effects
- **Card Hover**:
  - **Scale**: 1.05x
  - **Z-Index**: Bring to front
  - **Shader**: "Pixel Sort" effect that resolves to clear image on mouse leave

### Advanced Effects

#### 3D Elements
- **Card Depth**: Cards have physical thickness (10px) revealed on rotation
- **Lighting**: Virtual point light source follows cursor, casting dynamic shadows

---

## Section 3: About

### Layout
**"The Deconstructed Portrait"**
A rebellion against the standard 2-column layout. The portrait image is broken into a grid of floating rectangles that coalesce as the user scrolls. The text wraps around the negative space in a fluid, organic shape.

#### Spatial Composition
- **Grid**: CSS Grid with variable span cells
- **Image State**: Initially fragmented, merges on scroll
- **Text Flow**: Asymmetric, breaking the vertical rhythm

### Content
- **Headline**: "ABOUT"
- **Body**: "We craft digital experiences that defy conventions..."

### Images
**About Portrait Image**
- **Resolution**: High-res portrait
- **Aspect Ratio**: 4:5
- **Transparent Background**: No
- **Visual Style**: Black and white studio portrait
- **Subject**: Young adult male, early 20s, neutral expression
- **Color Palette**: Monochrome grayscale
- **Generation Prompt**: "A black and white studio portrait of a young adult male with short, curly hair and light facial hair, wearing a plain dark t-shirt. The subject faces the camera with a neutral, serious expression. The background is a solid, very light gray or white, with soft, even lighting that minimizes shadows and creates a calm, introspective mood. The composition is centered, head-and-shoulders, with the subject sharply in focus and no visible props or distractions."

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Image Fragments | Converge | Gap: 50px → 0px | 1.2s | 0.2s | expo.out |
| Text Lines | Slide Up | y: 50px → 0px | 0.8s | Stagger 0.1s | expo.out |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Image Grid | Merge | Top 80% | Center | Gap 50px → 0px |
| Scroll | Headline | Tracking | Top | Bottom | Letter-spacing 0 → 20px |

#### Continuous Animations
- **Image**: Subtle "breathing" scale (1.0 to 1.02) over 6s

### Advanced Effects

#### Shader Effects
**"Heat Haze"**: A subtle distortion shader applied to the gaps between image fragments before they merge, simulating a "heat haze" or energy field that dissipates as the image solidifies.

---

## Section 4: Contact

### Layout
**"Magnetic Field"**
The layout is minimal, but the input fields are not just boxes. They are magnetic zones that attract the cursor. The form is a single, continuous line that draws itself onto the screen.

#### Spatial Composition
- **Form**: Centered, narrow column (600px max)
- **Inputs**: Borderless, bottom border only
- **Background**: Deep black with a faint, pulsing red radial gradient

### Content
- **Headline**: "CONTACT"
- **Fields**: Name, Email, Message
- **Button**: "SEND MESSAGE"

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Form Lines | Draw SVG | Stroke-dashoffset 100% → 0% | 1.5s | 0s | ease.inOut |
| Inputs | Fade In | Opacity 0 → 1 | 0.5s | 0.8s | linear |

#### Interaction Effects
- **Input Focus**: The bottom border glows red and expands to 2px width
- **Input Hover**: Placeholder text floats up and turns red
- **Submit Hover**: Button fills with liquid red animation from the bottom up

### Advanced Effects

#### Particle System
**"Digital Sparks"**: When the user types, tiny red particle sparks emit from the caret position, falling down like digital embers.

---

## Section 5: Footer

### Layout
**"The Final Signal"**
A clean, structured footer that contrasts the chaos above. It acts as a "grounding" element. The logo is massive, spanning the full width behind the links in a dark-gray watermark style.

#### Spatial Composition
- **Background**: Dark Gray (#171717)
- **Logo**: Centered, 80% width, opacity 0.05
- **Links**: Flex row, spaced evenly

### Content
- **Logo**: "Kimi" watermark
- **Links**: Home, Works, About, Contact, Style Guide, Licenses, Changelog
- **Legal**: © 2024 Kimi. All rights reserved.

### Motion Choreography

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Watermark | Parallax | Top | Bottom | y: -50px |

#### Interaction Effects
- **Links**: On hover, a red strikethrough line draws through the text (0% to 100% width)

---

## Technical Implementation Notes

### Required Libraries
- **Three.js / OGL**: For the hero shader and 3D card effects
- **GSAP (ScrollTrigger)**: For timeline management and scroll choreography
- **Lenis**: For smooth, momentum-based scrolling
- **SplitType**: For text splitting animations

### Critical Performance Rules
- ✅ **WebGL**: Use a single canvas context for all WebGL effects (hero + works)
- ✅ **Transforms**: Only animate transform and opacity
- ✅ **Texture Management**: Preload hero textures, lazy load work textures
- ✅ **Shader Optimization**: Low precision floats in fragment shaders
- ❌ **No Layout Thrashing**: Read layout metrics once, animate transforms
- ❌ **Avoid heavy blurs**: Use opacity for depth, not blur filters

### Browser Support
- **WebGL Fallback**: Static images with CSS hover scale for non-WebGL devices
- **Reduced Motion**: If `prefers-reduced-motion` is true, disable parallax and smooth scroll, switch to simple fades

### Asset Preservation
- All original image paths and transparency settings are maintained
- Font families (Bebas Neue, Montserrat) are preserved
- Original color hex codes (#ff0000, #171717, etc.) are used as the shader base colors
