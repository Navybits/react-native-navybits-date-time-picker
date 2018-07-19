
package com.reactlibrary;
 
import android.app.Activity;
import android.app.DialogFragment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

public class RNNavybitsDateTimePickerModule extends ReactContextBaseJavaModule {
    private Activity activity;

    public RNNavybitsDateTimePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.activity = getCurrentActivity();
    }


    @Override
    public String getName() {
        return "DateTimePicker";
    }


    @ReactMethod
    public void showTimePicker(ReadableMap options, Callback callback) {
       String mode = options.hasKey("mode") ? options.getString("mode") : "time";

       if(mode.equals("time")) {
           DialogFragment timePicker = new TimePickerFragment(options, callback);

           timePicker.show(getCurrentActivity().getFragmentManager(), "timePicker");
       }else{
           DialogFragment datePicker = new DatePickerFragment(options, callback);

           datePicker.show(getCurrentActivity().getFragmentManager(), "datePicker");

       }
    }
}
 