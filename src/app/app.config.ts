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
    public static admin_group:string;
    public static admin_content:string;
    public static myadmingroupid:string;
    public static admingroupid:any;
    public static admingroupname:any;
    public static adminstarttime:any;
    public static adminendtime:any;
    public static admindayweek:any;
    public static adminplace:any;
    public static admingroup_password:any;
    public static selectid:any;

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
    public static getadmingroup() {
        return this.admin_group;
    }
    public static setadmingroup(admin_group) {
        this.admin_group = admin_group;
    }
    public static getadmincontent() {
        return this.admin_content;
    }
    public static setadmincontent(admin_content) {
        this.admin_content = admin_content;
    }
    public static getadmingroupid() {
        return this.admingroupid;
    }
    public static setadmingroupid(admingroupid) {
        this.admingroupid = admingroupid;
    }
    public static getadmingroupname() {
        return this.admingroupname;
    }
    public static setadmingroupname(admingroupname) {
        this.admingroupname = admingroupname;
    }
    public static getadminstarttime() {
        return this.adminstarttime;
    }
    public static setadminstarttime(adminstarttime) {
        this.adminstarttime = adminstarttime;
    }
    public static getadminendtime() {
        return this.adminendtime;
    }
    public static setadminendtime(adminendtime) {
        this.adminendtime = adminendtime;
    }
    public static getadminplace() {
        return this.adminplace;
    }
    public static setadminplace(adminplace) {
        this.adminplace = adminplace;
    }
    public static getadmindayweek() {
        return this.admindayweek;
    }
    public static setadmindayweek(admindayweek) {
        this.admindayweek = admindayweek;
    }
    public static getadmingrouppwd() {
        return this.admingroup_password;
    }
    public static setadmingrouppwd(admingroup_password) {
        this.admingroup_password = admingroup_password;
    }
    public static getmyadmingroupid() {
        return this.myadmingroupid;
    }
    public static setmyadmingroupid(myadmingroupid) {
        this.myadmingroupid = myadmingroupid;
    }
    public static getselectid() {
        return this.selectid;
    }
    public static setselectid(selectid) {
        this.selectid = selectid;
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
        this.admin_content = null;
        this.admin_group = null;
        this.admingroupid = null;
        this.admingroupname = null;
        this.adminstarttime = null;
        this.adminendtime = null;
        this.adminplace = null;
        this.admindayweek = null;
        this.admingroup_password = null;
        this.myadmingroupid = null;
        this.selectid = null;
    }
}