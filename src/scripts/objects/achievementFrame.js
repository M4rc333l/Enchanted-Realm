

export default class AchievementFrame {
    constructor(context,x,y,type, amount, title, description, enabled) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.enabled = enabled;
        this.type = type;
        this.amount = amount;
        this.title = title;
        this.description = description;
        this.create();
    }
    create() {

        let imageTint;
        let textTint;

        switch(this.type) {
            case 'kills': imageTint= 0xff1111; textTint= 0xff4444; break;
        }

        this.image = this.context.add.image(this.x, this.y,'achievementframe');
        this.image.setTint(imageTint);
        this.image.setOrigin(0,0);

        this.textAmount = this.context.add.text(this.x+17, this.y+17, this.amount,
            { fontFamily:'Pixelart', fontSize: '20px', color: 'white', stroke: 'black', strokeThickness: 5 })
            .setOrigin(0.5);

        this.textAmount.setTint(textTint);

        this.textTitle = this.context.add.text(this.x+40, this.y+0, this.title)
            .setOrigin(0,0);

            this.descriptionTitle = this.context.add.text(this.x+40, this.y+16, this.description, {fontSize:'12px'})
            .setOrigin(0,0);


    }

    delete() {
        this.image.destroy();
        this.textTitle.destroy();
        this.textAmount.destroy();
        this.descriptionTitle.destroy();
    }
}