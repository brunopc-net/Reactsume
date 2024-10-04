const fs = require('fs');

const resume_path = 'public/resume.json';
var resume = require(`../../${resume_path}`);

const SkillExtractor = require('./SkillsExtractor');
const ExperienceTime = require('./ExperienceTime');

function getTotalXp(xpMonths){
    const xpYears = xpMonths/12;
    const roundedYears = Math.round(xpYears)

    return xpYears < roundedYears ? 
        roundedYears : 
        roundedYears+'+';
}

function enrichResume(){
    //Enrich work experioence
    let xpTotalMonths = 0;
    resume.work.forEach(item => {
        const xp = item.experience.override ? 
            item.experience :
            new ExperienceTime(item).getXp();
        item.experience = xp;
        xpTotalMonths += xp.months;
    });
    resume.basics.experience = getTotalXp(xpTotalMonths);
    
    //Enrich skills
    //resume.skills = new SkillExtractor(resume).extract();

    fs.writeFileSync(resume_path,
        JSON.stringify(resume, null, 3)
    );
}

enrichResume();