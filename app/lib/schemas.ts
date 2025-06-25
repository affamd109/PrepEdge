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