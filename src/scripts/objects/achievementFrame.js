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
        let descriptionTint = 0xffffff;

        switch(this.type) {
            case 'kills': imageTint= 0xff1111; textTint= 0xff4444; break;
            case 'distance': imageTint= 0x11ff11; textTint= 0x44ff44; break;
            case 'score': imageTint= 0x1111ff; textTint= 0x4444ff; break;
        }

        if(this.enabled == false) {
            imageTint= 0x444444;
            textTint= 0x888888;
            descriptionTint = 0xBBBBBB;
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
        this.textTitle.setTint(descriptionTint);

        this.descriptionTitle = this.context.add.text(this.x+40, this.y+16, this.description, {fontSize:'12px'})
            .setOrigin(0,0);
        this.descriptionTitle.setTint(descriptionTint);

    }

    delete() {
        this.image.destroy();
        this.textTitle.destroy();
        this.textAmount.destroy();
        this.descriptionTitle.destroy();
    }
}