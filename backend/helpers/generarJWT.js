import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  // console.log("jst",process.env.JWT_SECRET);
  console.log("el id es",id);
  return jwt.sign( {id} , process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
export default generarJWT;
