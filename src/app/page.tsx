import { db } from "~/server/db";
export const dynamic = "force-dynamic";

export default async function HomePage() {

  const mockUrls = [ 
    'https://utfs.io/f/9b7c49b4-c462-4643-b132-e29e53494ea2-d0250a.jpg',
    'https://utfs.io/f/3e75955b-36fe-4df3-9fcc-439f81f23a64-jaws4v.jpg',
    'https://utfs.io/f/2e5b70b7-35ea-4bc8-8933-a729b998fa24-9mc9xc.jpg',
    'https://utfs.io/f/faa5bfcd-5210-40d8-9433-54082c3af4ed-8hic38.png'
  ];

  const mockImages = mockUrls.map((url, index) => ({
    id: index + 1,
    url
  }));

  const posts = await db.query.posts.findMany();
  

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map(post => (
          <span>{post.name}</span>
        ))}
        {mockImages.map(image => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
