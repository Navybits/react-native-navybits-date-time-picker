
Pod::Spec.new do |s|
  s.name         = "RNNavybitsDateTimePicker"
  s.version      = "1.0.0"
  s.summary      = "RNNavybitsDateTimePicker"
  s.description  = <<-DESC
                  RNNavybitsDateTimePicker
                   DESC
  s.homepage     = "https://github.com/HananeAlSamrout/react-native-navybits-date-time-picker"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNNavybitsDateTimePicker.git", :tag => "master" }
  s.source_files  = "RNNavybitsDateTimePicker/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  
