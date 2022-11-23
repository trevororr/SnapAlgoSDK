import BaseScreen from './screens/BaseScreen';

export default class WalletUI{
    
    constructor(wallet){
        this.wallet = wallet;
        this.price = null;
        this.userBalance = null;
        this.transactions = null;
        this.screen = "base";
        this.assets = null;
        this.baseScreen = new BaseScreen(this, this.wallet);
    }

    async preLoad(){
        
        let price = fetch("https://api.coincap.io/v2/assets/algorand" ,{
            method: 'GET',
            redirect: 'follow'
          })
        .then((res)=>res.text())
        .then((text)=>{
          this.price = Number(JSON.parse(text).data.priceUsd)
        })
        .catch((error)=>{
            console.log(error);
            this.price = 0;
        });
        return await Promise.all([price])
        
        
    }

    renderScreen(){
        console.log("rendering screen");
        if(this.screen == "base"){
            let screen = this.getScreen();
            screen.silent = true;
            this.wallet.render(screen);
        }
        else if(this.screen === "receive"){
            this.receiveScreen.render({silent: true});
        }
        else if(this.screen === "send"){
            this.sendScreen.render({silent:true});
        }
        else if(this.screen === "ledger"){
            this.ledgerScreen.render({silent:true});
        }
        else if(this.screen === 'account'){
            this.accountscreen.render({silent:true});
        }
        else if(this.screen === "exchange"){
            this.exchangeScreen.render();
        }
        else{
            console.log("no such screen");
        }
    } 

      
    getScreen(){
        return this.baseScreen.render();
    }
}