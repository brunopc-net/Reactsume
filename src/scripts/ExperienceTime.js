class ExperienceTime {
    constructor(item) {
        this.item = item;
    }

    getXp(){
        if(this.item.experience){
            return this.item.experience
        }

        const start = this.item.startDate;
        const end = this.item.endDate ? this.item.endDate : new Date().toISOString();
        const months = this.getMonths(start, end);

        return {
            months: months,
            years: Math.round((months/12)*2)/2 //Round to nearest half
        };
    }

    getMonths(start, end){
        const startDate = new Date(start);
        const endDate = new Date(end);
    
        var months = 1 +
            (endDate.getFullYear() - startDate.getFullYear()) * 12
            + endDate.getMonth() - startDate.getMonth()
            
        return months <= 0 ? 0 : months;
    };
}

module.exports = ExperienceTime;