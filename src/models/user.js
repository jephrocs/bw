export class User {
    constructor(_id,guid,isActive,balance,picture, age,eyeColor,first,last,company,email,password,salt,phone, address) {
       this._id=_id;
        this.guid=guid;
       this.isActive=isActive;
       this.balance=balance;
       this.picture=picture;
       this.age=age;
       this.eyeColor=eyeColor;
       this.name={
            first:first,
            last:last
        }
        this.company=company;
        this.email=email;
        this.password= password;
        this.salt=salt;
        this.phone= phone;
        this.address=address;
    }

  }

//   foundUser = new User( 
//     '',
//     '',
//         isActive,
//         balance,
//        picture,
//         age,
//         eyeColor,
//         name,
//         company,
//     '',
//         '',
//        '',
//        phone,
//         address,)