App.accessRule('blob:*');
App.accessRule('gap://*');
App.accessRule('https://reentry.me');
App.accessRule('https://*.googleapis.com');
App.accessRule('https://*.gstatic.com');
App.accessRule('https://*.bootstrapcdn.com');

App.setPreference('StatusBarStyle', 'false');
App.setPreference('StatusBarBackgroundColor', '#FFFFFF');
App.setPreference('BackupWebStorage','local');

App.info({
  id: 'com.reentry',
  version: '1.0.0',
  name: 'ReEntry',
  description: 'Resources for parolees',
  author: 'Legal Robot, Inc.',
  email: 'hello@reentry.me',
  website: 'https://reentry.me/'
});

App.setPreference('Orientation', 'all', 'ios');
App.setPreference('Orientation', 'unspecified', 'android');

App.icons({
	// iOS
	'iphone_2x': 'resources/icon-40@3x.png', // (120x120)
	'iphone_3x': 'resources/icon-60@3x.png', // (180x180)
	'ipad': 'resources/icon-76.png', // (76x76)
	'ipad_2x': 'resources/icon-76@2x.png', // (152x152)
	'ipad_pro': 'resources/icon-83.5@2x.png', // (167x167)
	'ios_settings': 'resources/icon-small.png', // (29x29)
	'ios_settings_2x': 'resources/icon-small@2x.png', // (58x58)
	'ios_settings_3x': 'resources/icon-small@3x.png', // (87x87)
	'ios_spotlight': 'resources/icon-40.png', // (40x40)
	'ios_spotlight_2x': 'resources/icon-40@2x.png', // (80x80)

	// Android
	'android_ldpi': 'resources/drawable-ldpi/icon.png',
	'android_mdpi': 'resources/drawable-mdpi/icon.png',
	'android_hdpi': 'resources/drawable-hdpi/icon.png',
	'android_xhdpi': 'resources/drawable-xhdpi/icon.png',
	'android_xxhdpi': 'resources/drawable-xxhdpi/icon.png',
	'android_xxxhdpi': 'resources/drawable-xxxhdpi/icon.png'
});
