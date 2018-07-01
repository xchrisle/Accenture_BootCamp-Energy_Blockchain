pragma solidity ^0.4.18;

contract Power {
	uint production;
	uint efficiency;
	uint current_usage;
	uint average_usage;
	uint amount_spent_this_month;
	uint amount_saved_this_month;

	function Power() public {
		production = 1000;
		efficiency = 29;
		current_usage = 1567;
		average_usage = 1234;
		amount_spent_this_month = 2382;
		amount_saved_this_month = 273;
	}

	function getProduction() public view returns (uint) {
		return production;
	}
	function getEfficiency() public view returns (uint) {
		return efficiency;
	}
	function getCurrent_usage() public view returns (uint) {
		return current_usage;
	}
	function getAverage_usage() public view returns (uint) {
		return average_usage;
	}
	function getAmount_spent_this_month() public view returns (uint) {
		return amount_spent_this_month;
	}
	function getAmount_saved_this_month() public view returns (uint) {
		return amount_saved_this_month;
	}
}