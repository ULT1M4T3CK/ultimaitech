/**
 * Restores default blog content when blog_posts was lost (e.g. new DB volume).
 * Historical seed article (previously shared with a separate app).
 * Run on the server: cd /opt/website-backend && node scripts/recover-blog-posts.js
 */
require('dotenv').config();
const { query } = require('../src/db');

const ADMIN_EMAIL = process.env.WEBSITE_ADMIN_EMAIL || 'info@ultimaitech.com';

const title = 'Tips and Tricks for a modern and responsive website.';
const slug = 'tips-and-tricks-modern-responsive-website';
const excerpt =
  "Creating a modern and responsive website is essential in today's digital age. Not only does it enhance user experience, but it also boosts engagement and conversion rates. Whether you're a small business owner or a seasoned marketer, understanding the key elements of effective web design can set you apart from the competition. In this article, we'll explore tips and tricks to help you create a website that's not only visually appealing but also functional and user-friendly.";

const rawContent = `
<p><em>This article was restored automatically after the blog database was empty. Re-upload cover and inline images in the admin editor if needed.</em></p>

<p>A responsive homepage is crucial because it ensures your website looks great on all devices, from desktops to smartphones. With more people accessing the web via mobile devices, having a website that adapts to different screen sizes is no longer optional—it's a necessity.</p>

<h2>Why Responsive Design Matters</h2>
<p>Responsive design improves user experience by providing a seamless transition between devices. This flexibility not only keeps visitors on your site longer but also increases the likelihood of conversions. Moreover, search engines like Google prioritize mobile-friendly websites in their rankings, meaning a responsive design can also boost your visibility online.</p>

<h2>Homepage Best Practices</h2>
<p>A well-designed homepage sets the tone for your entire site. It's the first thing visitors see, so it should be engaging and informative.</p>

<h3>Key Elements of an Effective Homepage</h3>
<ul>
  <li><strong>Clear and Concise Headlines:</strong> Your headline should immediately communicate what your website is about. It should be short, direct, and engaging.</li>
  <li><strong>Compelling Call-to-Action (CTA):</strong> A strong CTA guides your visitors to take the desired action, whether it's signing up for a newsletter or making a purchase.</li>
  <li><strong>Easy Navigation:</strong> Your navigation menu should be simple and intuitive. Visitors should be able to find what they're looking for without any hassle.</li>
  <li><strong>Visual Hierarchy:</strong> Use different font sizes, colors, and spacing to guide the visitor's eye through your homepage. Important elements should stand out to draw attention.</li>
  <li><strong>Fast Loading Times:</strong> Speed is crucial. A slow-loading website can turn visitors away before they even see your content. Use tools like Google PageSpeed Insights to identify and fix issues.</li>
</ul>

<h2>Creative Elements in Web Design</h2>
<p>Incorporating creative elements can make your website stand out. However, it's important to strike a balance between creativity and functionality.</p>

<h3>Incorporating Modern Web Design Trends</h3>
<ul>
  <li><strong>Minimalistic Design:</strong> Less is more. A clean, uncluttered design helps visitors focus on your message without distractions.</li>
  <li><strong>Bold Typography:</strong> Using bold, eye-catching fonts can create a strong visual impact and convey your brand's personality.</li>
  <li><strong>Dynamic Backgrounds:</strong> Video backgrounds or animations can add an element of interest to your homepage. Just ensure they don't slow down your site.</li>
  <li><strong>Interactive Elements:</strong> Features like sliders, carousels, or hover effects can engage users and encourage interaction with your site.</li>
</ul>

<h2>The Role of Storytelling in Web Design</h2>
<p>A compelling story can captivate your audience and create an emotional connection with your brand.</p>

<h3>Crafting Your Brand's Story</h3>
<ul>
  <li><strong>Identify Your Brand's Unique Value Proposition (UVP):</strong> What makes your business stand out? Clearly communicate this on your homepage.</li>
  <li><strong>Use Authentic Imagery:</strong> Real photos of your team, products, or services can build trust and make your story more relatable.</li>
  <li><strong>Customer Testimonials:</strong> Sharing positive feedback from satisfied customers can enhance your credibility and reinforce your brand story.</li>
</ul>

<h2>Optimizing Your Website for Better Performance</h2>
<p><em>by Justin Morgan (https://unsplash.com/@justin_morgan)</em></p>
<p>Optimization is key to ensuring your website runs smoothly and efficiently.</p>

<h3>Tips for Homepage Optimization</h3>
<ul>
  <li><strong>Optimize Images:</strong> Large images can slow down your site. Use tools like TinyPNG to compress images without losing quality.</li>
  <li><strong>Leverage Browser Caching:</strong> This technique stores some of your site's data on the user's device, reducing load times on subsequent visits.</li>
  <li><strong>Minimize HTTP Requests:</strong> Each element on your page (images, scripts, etc.) requires an HTTP request. Reducing these can improve load times.</li>
  <li><strong>Use a Content Delivery Network (CDN):</strong> CDNs distribute your site's data across multiple servers worldwide, speeding up access times for users regardless of their location.</li>
</ul>

<h2>Partnering with a Web Design Agency</h2>
<p>Collaborating with a professional web design agency can elevate your website to the next level. Agencies like Clio Websites in Calgary or Vincent Design Inc. can provide expert insights and innovative solutions tailored to your needs.</p>

<h3>Benefits of Working with a Web Design Agency</h3>
<ul>
  <li><strong>Expertise and Experience:</strong> Agencies have a team of skilled professionals who keep up with the latest design trends and technologies.</li>
  <li><strong>Custom Solutions:</strong> They can create a unique website that reflects your brand and meets your specific requirements.</li>
  <li><strong>Ongoing Support and Maintenance:</strong> Post-launch, agencies offer support to ensure your website remains up-to-date and functional.</li>
</ul>

<h2>Conclusion</h2>
<p>Creating a modern and responsive website involves a blend of design aesthetics, technical know-how, and strategic planning. By focusing on responsive design, incorporating creative elements, telling your brand's story, and optimizing for performance, you can create a website that not only attracts visitors but also converts them into loyal customers. Whether you choose to tackle this on your own or partner with a web design agency, the key is to stay current with trends and prioritize the user experience.</p>
<p>Remember, your website is often the first impression potential customers have of your business. Make it count.</p>
`.trim();

async function main() {
  const { rows: countRows } = await query('SELECT COUNT(*)::int AS n FROM blog_posts');
  const n = countRows[0]?.n ?? 0;
  console.log(`[recover-blog-posts] Current blog_posts count: ${n}`);

  const sql = `
    INSERT INTO blog_posts (
      slug, locale, title, excerpt, cover_image_url, content, status, published_at,
      author_name, author_email, meta_title, meta_description, meta_image_url, canonical_url, noindex, key_takeaways
    ) VALUES (
      $1, 'nl', $2, $3, NULL, $4, 'published', NOW(),
      'Website Admin', $5, NULL, NULL, NULL, NULL, FALSE, NULL
    )
    ON CONFLICT (slug, locale) DO UPDATE SET
      title = EXCLUDED.title,
      excerpt = EXCLUDED.excerpt,
      cover_image_url = EXCLUDED.cover_image_url,
      content = EXCLUDED.content,
      status = EXCLUDED.status,
      published_at = EXCLUDED.published_at,
      author_name = EXCLUDED.author_name,
      author_email = EXCLUDED.author_email,
      meta_title = EXCLUDED.meta_title,
      meta_description = EXCLUDED.meta_description,
      meta_image_url = EXCLUDED.meta_image_url,
      canonical_url = EXCLUDED.canonical_url,
      noindex = EXCLUDED.noindex,
      key_takeaways = EXCLUDED.key_takeaways
    RETURNING id, slug;
  `;

  const { rows } = await query(sql, [slug, title, excerpt, rawContent, ADMIN_EMAIL]);
  console.log('[recover-blog-posts] Upserted:', rows[0]);

  const { rows: after } = await query('SELECT COUNT(*)::int AS n FROM blog_posts');
  console.log(`[recover-blog-posts] New blog_posts count: ${after[0].n}`);
}

main().catch((err) => {
  console.error('[recover-blog-posts] Failed:', err);
  process.exit(1);
});
