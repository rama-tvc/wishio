import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const authOptions = {
    
    providers:[
        GitHub({
            clientId:process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
    ]
  
};
