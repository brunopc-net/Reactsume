class SkillExtractor {
    constructor(resume) {
        this.resume = resume;
        this.skills = [ //Skills to extract from resume
            { name: "Backend", keywords: [] },
            { name: "Backend QA", keywords: [] },
            { name: "DevOps", keywords: [] },
            { name: "Frontend", keywords: [] },
            { name: "Frontend QA", keywords: [] },
            { name: "Databases", keywords: [] }
        ];
    }

    extract(){
        this.resume.work.forEach(item => this.addSkills(item));
        this.resume.education.forEach(item => this.addSkills(item));
        this.resume.certificates.forEach(item => this.addSkills(item));
        this.resume.projects.forEach(item => this.addSkills(item));
        return this.skills;
    };

    addSkills(item) {
        item.skills && item.skills.forEach(itemSkill => {
            const category = this.skills.find(category => category.name === itemSkill.name);
            category && itemSkill.keywords.forEach(kword => {
                if(!category.keywords.includes(kword)){
                    category.keywords.push(kword);
                }
            });
            //If needed for the future, this is the code to calculate the experience individually for every skill
            /*
            if(category){
                if(item.experience){
                    itemSkill.keywords.forEach(kword => {
                        if (this.keywordPresent(category, kword)) {
                            category.keywords = category.keywords.map(kw => 
                                kw.name === kword ? { name: kword, xp: item.experience.months + kw.xp } : kw
                            )
                        } else {
                            // Add the new object
                            category.keywords.push({ name: kword, xp: item.experience.months });
                        }
                    });
                } else {
                    itemSkill.keywords.forEach(kword => {
                        if(!this.keywordPresent(category, kword)){
                            category.keywords.push({ name: kword });
                        }
                    });
                }
            }
            */
        });
    }

    /*
    keywordPresent(category, keywordName){
        return category.keywords.some(kw => kw.name === keywordName);
    }
    */
}

module.exports = SkillExtractor;