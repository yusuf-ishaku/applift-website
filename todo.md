- Check figma for comments
- Make all pages responsive
- Add links on footer especially socials
- Not found route
- Post preview (use tabs)
- Proper 404 page
- Middleware to verify authenticated users on server functions
- Restricted login
- Draggable false to every image
- Remove /classnames
- Link for sharing to public and other editors
- Button to copy live link
- Proper image for OG previews
- Use a proper top loader or a pending component
- Add infinite queries on sidebar for drafts and published posts https://tanstack.com/query/v5/docs/framework/react/guides/infinite-queries

next top loader
collect responses on help-form
increase server action payload limit
get eslint rule to stop passing objects to template literals
hijack streaming in autoplay-video
Add debounced checks to check for availability of slug
Replace imported background images with actual <Image> for nextjs optimization
import Image from 'next/image';

function MyComponent() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <Image
        src="/path/to/your/background-image.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={80} // Adjust quality as needed
        priority // If it's a critical background image
      />
      {/* Your foreground content here */}
      <div style={{ position: 'relative', zIndex: 1, color: 'white' }}>
        <h1>My Awesome Content</h1>
        <p>Some text over the background image.</p>
      </div>
    </div>
  );
}
import Image from 'next/image'
import mountains from '../public/mountains.jpg'

export default function Background() {
  return (
    <Image
      alt="Mountains"
      src={mountains}
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      style={{
        objectFit: 'cover',
      }}
    />
  )
}

Move post between drafts and published from query client after deleting, updating and publishing
