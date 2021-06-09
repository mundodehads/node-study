<?php
class Findphone {
	private function convert ($char){
		if($char == "A" || $char == "B" || $char == "C")
			return 2;
		if($char == "D" || $char == "E" || $char == "F")
			return 3;
		if($char == "G" || $char == "H" || $char == "I")
			return 4;
		if($char == "J" || $char == "K" || $char == "L")
			return 5;
		if($char == "M" || $char == "N" || $char == "O")
			return 6;
		if($char == "P" || $char == "Q" || $char == "R" || $char == "S")
			return 7;
		if($char == "T" || $char == "U" || $char == "V")
			return 8;
		if($char == "W" || $char == "X" || $char == "Y" || $char == "Z")
			return 9;
		return 0;
	}
	function getPhone ($str){
		//Convert the input a-z to A-Z then split to a array
		$arr = str_split(strtoupper($str));
		$phone = "";
		foreach($arr AS $char){
			$convert = $this->convert($char);
			if($convert == 0)
				$phone .= $char;
			else 
				$phone .= "$convert";
		}
		return $phone;
	}
}
?>