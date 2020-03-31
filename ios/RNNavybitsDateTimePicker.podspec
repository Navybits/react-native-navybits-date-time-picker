
Pod::Spec.new do |s|
  s.name         = "RNNavybitsDateTimePicker"
  s.version      = "1.0.0"
  s.summary      = "RNNavybitsDateTimePicker"
  s.description  = <<-DESC
                    This project is a modified version of react-native-datePicker. It solves the need to set a MinuteInterval on android using the native picker MaterialDateTimePicker
                   DESC
  s.homepage     = "https://github.com/Navybits/react-native-navybits-date-time-picker/tree/master/ios"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "Hanane" => "hanane.alsamrout@navybits.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/Navybits/react-native-navybits-date-time-picker.git", :tag => "master" }
  s.source_files  = "RNNavybitsDateTimePicker/**/*.{h,m}"
  s.requires_arc = true

 

  s.dependency "React"
  #s.dependency "others"

end

  