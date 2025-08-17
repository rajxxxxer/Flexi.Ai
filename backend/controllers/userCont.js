import sql from "../configs/db.js";

export const getuserCreation= async (req, res) => {
  try {
    const { userId } = req.auth();
    

    const creations = await sql`
      SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    return res.json({ success: true, creations });
  } catch (err) {
    console.error("Error fetching user creations:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getPublishCreation= async (req, res) => {
  try {

    
const creations = await sql`
  SELECT * 
  FROM creations
  WHERE type = 'image'
  ORDER BY created_at DESC
`;

    return res.json({ success: true, creations });
  } catch (err) {
    console.error("Error fetching user creations:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const togglelike = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Creation ID is required" });
    }

    // Get the creation by ID
    const [creation] = await sql`
      SELECT * FROM creations WHERE id = ${id}
    `;

    if (!creation) {
      return res.status(404).json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIdString = userId.toString();

    let message;

    // Check if user already liked
    if (currentLikes.includes(userIdString)) {
      // Remove user ID from likes
      await sql`
        UPDATE creations
        SET likes = array_remove(likes, ${userIdString})
        WHERE id = ${id}
      `;
      message = "Creation unliked";
    } else {
      // Add user ID to likes
      await sql`
        UPDATE creations
        SET likes = array_append(likes, ${userIdString})
        WHERE id = ${id}
      `;
      message = "Creation liked";
    }

    return res.json({ success: true, message });
  } catch (err) {
    console.error("Error toggling like:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

