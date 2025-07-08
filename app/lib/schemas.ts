import { z } from 'zod';

export const onboardingSchema = z.object({
    industry: z.string({ required_error: "Industry is required" }),
    subIndustry: z.string({ required_error: "Please select a specialisation" }),
    bio: z.string().max(500).optional(),
    experience: z.string().transform((val) => parseInt(val, 10))
        .pipe(     //pipe lets u continue validation after transformation
            z.number().
                min(0, "Experience must be atleast 0 years").
                max(50, "Experience must be less than 50 years")),
    skills: z.string().transform((val) =>val ? val
    /*ternary */            .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean)
            : undefined
    ),

});

export const contactSchema = z.object({
    email : z.string().email("Invalid email address"),
    mobile : z.string().optional(),
    github : z.string().optional(),
    linkedIn : z.string().optional(),
});


export const entrySchema = z.object({
    title : z.string().min(1 , "Title is required"),
    organization : z.string().min(1 , "Organizatiion is required"),
    startDate : z.string().min(1 , "Start date is required"),
    endDate : z.string().optional(),
     description: z.string().min(1, "Description is required"),
    current: z.boolean().default(false),

}).refine((data) =>{
    if(!data.current && !data.endDate){
        return false;
    }
    return true;
},

{ /* In Zod, the **path** inside .refine() is used to specify which field the error message should be associated with when validation fails.*/
    message : "End date is required unless this is your current position",
    path: ["endDate"]
}

);

export const resumeSchema = z.object({
  contactInfo: contactSchema,
  summary: z.string().optional(),
  skills: z.string().min(1, "Skills are required"),
  experience: z.array(entrySchema),
  education: z.array(entrySchema),
  projects: z.array(entrySchema),
});

