export class Appconfig {
    
    public static username: string;
    public static tel:string;
    public static sfz:string;
    public static utype:number;
    public static uimg:string;
    public static uid:number;
    public static truename:string;
    public static gonghao:string;
    public static user_group:any;
    public static lessons:any;
    public static mygroup:string;

    public static getusername() {
        return this.username;
    }
    public static setusername(usr) {
        this.username = usr;
    }
    public static gettel() {
        return this.tel;
    }
    public static settel(tel) {
        this.tel = tel;
    }
    public static getsfz() {
        return this.sfz;
    }
    public static setsfz(sfz) {
        this.sfz = sfz;
    }
    public static getutype() {
        return this.utype;
    }
    public static setutype(utype) {
        this.utype = utype;
    }
    public static getuimg() {
        return this.uimg;
    }
    public static setuimg(uimg) {
        this.uimg = uimg;
    }
    public static getuid() {
        return this.uid;
    }
    public static setuid(uid) {
        this.uid = uid;
    }
    public static gettruename() {
        return this.truename;
    }
    public static settruename(truename) {
        this.truename = truename;
    }
    public static getgonghao() {
        return this.gonghao;
    }
    public static setgonghao(gonghao) {
        this.gonghao = gonghao;
    }
    public static getusergroup() {
        return this.user_group;
    }
    public static setusergroup(user_group) {
        this.user_group = user_group;
    }
    public static getlessons() {
        return this.lessons;
    }
    public static setlessons(lessons) {
        this.lessons = lessons;
    }
    public static getmygroup() {
        return this.mygroup;
    }
    public static setmygroup(mygroup) {
        this.mygroup = mygroup;
    }
    public static clear(){
        this.username = null;
        this.uimg = null;
        this.uid = null;
        this.sfz = null;
        this.tel = null;
        this.utype = null;
        this.truename = null;
        this.gonghao = null;
        this.user_group = null;
        this.lessons = null;
        this.mygroup = null;
    }
}