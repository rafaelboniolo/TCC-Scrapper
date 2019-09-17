module.exports = class Tags{

    constructor(){
        var tags = [];
        var autoIndex = 0;
    }


    init(){
        this.tags = [
            'tijolo',
            'cimento',
            'parede',
            'telha']
    }

    get(index){
        return tags[index]
    }

    getAuto(){
        !this.autoIndex ? this.autoIndex = 1 : null;
        return this.tags[this.autoIndex-1]
    }

}

