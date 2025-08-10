export const generateArticle=async(req,res)=>{
  try{

  }
  catch(err){
    console.error("Error generating article:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  } 
}