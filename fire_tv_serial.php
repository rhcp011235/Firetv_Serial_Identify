<?
// 
// Decode the Firetv / FireTv Stick Serial Number
// By: John.b.hale@gmail.com
//
// Thanks to http://www.aftvnews.com for the info
// Original Post can be found at: http://www.aftvnews.com/how-to-decode-an-amazon-fire-tv-or-fire-tv-stick-serial-number/

function usage($name)
{
	echo "Decode your firetv or firestick serial number\n";
	echo "By: john.b.hale@gmail.com\nThanks to http://www.aftvnews.com for the info\n";
	echo "Original post: http://www.aftvnews.com/how-to-decode-an-amazon-fire-tv-or-fire-tv-stick-serial-number/\n\n\n";
	echo "Leave off the last letter of the serial number as its useless and it wont work with this script without mod\n";
	echo "Usage: ./$name serialnumber\n";
	
}


if ($argv[1] == "" || !is_numeric($argv[1]))
{
	usage($argv[0]);
	die;
}

$serial = $argv[1];

//
// Split the string into an array
$arr1 = str_split($serial);

echo "Decode your firetv or firestick serial number\n";
echo "By: john.b.hale@gmail.com\nThanks to http://www.aftvnews.com for the info\n";
echo "Original post: http://www.aftvnews.com/how-to-decode-an-amazon-fire-tv-or-fire-tv-stick-serial-number/\n\n\n";

//
// Manf
if ($arr1[0] == 7)
{
	echo "This was made by Foxconn\n";
}

//
// Condition
if ($arr1[1] == 0)
{
	echo "This unit is in New Condition\n";
} else {
	echo "This unit is in Refurbished Condition\n";
}

//
// Model
if ($arr1[2] == 9)
{
	if ($arr1[3] == 0)
	{ 
		echo "This is a Fire TV\n";
	}
	if ($arr1[3] == 1)
	{
		echo "This is a Fire Tv Stick\n";
	}
}

//
//hardware Revision
echo "Your hardware Revision is: " . $arr1[4].$arr1[5] . "\n";

//
//Unit Revision
echo "Your Unit Revision is: " . $arr1[6].$arr1[7] . "\n";

//
// Manufactured
echo "The Unit was Manufactured on: " . $arr1[9] . $arr1[10] . "/" . $arr1[11] . "/" . "201" .$arr1[8] . "\n";

