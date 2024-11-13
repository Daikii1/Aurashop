use Illuminate\Support\Facades\Hash;

$factory->define(User::class, function (Faker $faker) {
return [
'name' => $faker->name,
'email' => 'outmanejail@gmail.com',
'password' => Hash::make('qwerty123456'), // Always hash passwords
];
});