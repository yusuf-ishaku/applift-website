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
- reusable seo code
export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
}) => {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: '@tannerlinsley' },
    { name: 'twitter:site', content: '@tannerlinsley' },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'og:image', content: image },
        ]
      : []),
  ]

  return tags
}
