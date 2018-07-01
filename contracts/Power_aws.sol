pragma solidity ^0.4.18;

contract Power {
    //uint energy_generated = 100; //(watts) hard coded amount of electricity generated
    uint base_rate;
    uint peak_rate;
    uint current_rate;
    address consumer_addr;
    uint efficiency;
    uint energy_current_usage;
    uint energy_saved_usage;
    uint dollar_saved_usage;
    uint dollar_spent_usage;

    struct User {
      uint token_balance;
      uint production_rate;
      uint consumption_rate;
      uint current_usage;
      uint get_amount_spent_this_month;
      uint get_amount_saved_this_month;
    }

    mapping(address => User) user_list;

    //  HARD CODED CONSUMER AND prosumerS - perhaps what we could do, is find all the people who are producing excess energy, (check if they want to sell) and exchange it with people who are not producing excess energ
    // ADD EXTRA VARIABLE FOR o GENERATED
    function Power(address prosumer) public {
      base_rate = 1; //cents/kwh, originally 15.86. However, Solidity does not let you have decimal points.
      peak_rate = 2; //cents/kwh, originally 58.33 " " "
      efficiency = 29;
      energy_saved_usage = 10;
      energy_current_usage = 27;
      dollar_saved_usage = 1;
      dollar_spent_usage = 9;
      current_rate = base_rate;
      consumer_addr = msg.sender; // we are the consumer
      user_list[consumer_addr].token_balance = 100000;
      user_list[prosumer].token_balance = 0;

    }

    function set_rate (uint time) public {
      if (time >= 14 || time < 20) {
        current_rate = peak_rate;
      } else {
        current_rate = base_rate;
      }
    }

    function get_rate() constant public returns(uint) {
        return current_rate;
    }

    // Set prosumer address
    function set_prosumer(address prosumer, uint energy_generated) public {
      user_list[prosumer].production_rate = energy_generated;
      user_list[prosumer].consumption_rate = 0;
    }

    // Function: Transfers tokens from consumer to prosumer if the consumer has enough tokens. Transfer energy to prosumer.
    function token_transfer(address consumer, address prosumer) payable public {
      uint cost = current_rate * user_list[prosumer].production_rate;

      // checks if there's enough tokens in wallet, and checks that producer is producing enough energy
      if ((cost < user_list[consumer].token_balance)) {
        user_list[prosumer].token_balance += cost;
        user_list[consumer].token_balance -= cost;

        // Updating the consumption rate of the consumer and the production rate of the prosumer, assuming that the consumer consumes ALL of the energy produced
        user_list[consumer].consumption_rate += user_list[prosumer].production_rate;

        user_list[consumer].current_usage += energy_current_usage;

        user_list[consumer].get_amount_spent_this_month += dollar_spent_usage;
        user_list[consumer].get_amount_saved_this_month += dollar_saved_usage;
      }
    }

    // Function: Return energy production rate of prosumer
    function get_energy_produced(address prosumer) public view returns(uint) {
      return user_list[prosumer].production_rate;
    }

    function getProduction() public view returns(uint){
      return (user_list[msg.sender].production_rate);
    }

    function getCurrent_usage() public view returns(uint){
      return (user_list[msg.sender].current_usage);
    }

    function getAmount_spent_this_month() public view returns(uint){
      return (user_list[msg.sender].get_amount_spent_this_month);
    }

    function getAmount_saved_this_month() public view returns(uint){
      return (user_list[msg.sender].get_amount_saved_this_month);
    }

}
