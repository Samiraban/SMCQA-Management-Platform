import ResourceManager from "../ResourceManager.jsx";
import { createBlogPost, editBlogPost, deleteBlogPost } from "../../lib/api.js";

function ManageBlog() {
  return (
    <ResourceManager
      title="Manage Blog"
      description="Publish updates — they appear live on the Blog page instantly."
      collection="blog"
      columns={["image", "title", "excerpt", "author"]}
      fields={[
        { key: "image", label: "Cover Image", type: "image" },
        { key: "title", label: "Title", required: true },
        { key: "excerpt", label: "Short excerpt", type: "textarea", required: true },
        { key: "body", label: "Full article body", type: "textarea" },
        { key: "author", label: "Author", default: "SMC Team" },
      ]}
      onCreate={createBlogPost}
      onUpdate={editBlogPost}
      onDelete={deleteBlogPost}
    />
  );
}

export default ManageBlog;