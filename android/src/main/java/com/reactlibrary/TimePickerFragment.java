package com.reactlibrary;

import android.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;

import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;

import com.wdullaer.materialdatetimepicker.time.TimePickerDialog;
import com.wdullaer.materialdatetimepicker.time.Timepoint;
import com.facebook.react.uimanager.annotations.ReactProp;

public class TimePickerFragment extends DialogFragment implements TimePickerDialog.OnTimeSetListener {

    TimePickerDialog tpd;
    private Callback callback;
    private boolean enableSeconds, enableMinutes, dismissOnPause, vibrate, darkTheme, is24Hour;
    private int hour, minute, second, minutesInterval, hoursInterval, secondsInterval;
    private String okText, title, cancelText, accentColor, okColor, cancelColor;
    private ReadableArray disabledTimes;
    private String minTime, maxTime;


    public TimePickerFragment() {
    }

    public TimePickerFragment(ReadableMap options, Callback callback) {

        this.callback = callback;
        final Calendar c = Calendar.getInstance();

        title = options.hasKey("title") ? options.getString("title") : "";
        okText = options.hasKey("okText") ? options.getString("okText") : "OK";
        cancelText = options.hasKey("cancelText") ? options.getString("cancelText") : "CANCEL";

        hour = options.hasKey("hour") ? options.getInt("hour") : c.get(Calendar.HOUR_OF_DAY);
        minute = options.hasKey("minute") ? options.getInt("minute") : c.get(Calendar.MINUTE);
        second = options.hasKey("second") ? options.getInt("second") : c.get(Calendar.SECOND);

        minutesInterval = options.hasKey("minuteInterval") ? options.getInt("minuteInterval") : 15;
        hoursInterval = options.hasKey("hourInterval") ? options.getInt("hourInterval") : 1;
        secondsInterval = options.hasKey("secondInterval") ? options.getInt("secondInterval") : 10;

        enableMinutes = options.hasKey("enableMinutes") ? options.getBoolean("enableMinutes") : true;
        enableSeconds = options.hasKey("enableSeconds") ? options.getBoolean("enableSeconds") : false;
        dismissOnPause = options.hasKey("dismissOnPause") ? options.getBoolean("dismissOnPause") : false;
        vibrate = options.hasKey("vibrate") ? options.getBoolean("vibrate") : false;
        darkTheme = options.hasKey("darkTheme") ? options.getBoolean("darkTheme") : false;
        is24Hour = options.hasKey("is24Hour") ? options.getBoolean("is24Hour") : false;

        accentColor = options.hasKey("accentColor") ? options.getString("accentColor") : "#ffffff";
        okColor = options.hasKey("okColor") ? options.getString("okColor") : "#ffffff";
        cancelColor = options.hasKey("cancelColor") ? options.getString("cancelColor") : "#ffffff";

        if (options.hasKey("minTime"))
            minTime = options.getString("minTime");
        if (options.hasKey("maxTime"))
            maxTime = options.getString("maxTime");

        if (options.hasKey("disabledTimes"))
            disabledTimes = options.getArray("disabledTimes");
    }

    @ReactProp(name = "title")
    public void setTitle(String title) {
        tpd.setTitle(title);
    }

    @ReactProp(name = "okText")
    public void setOkText(String okText) {
        tpd.setOkText(okText);
    }

    @ReactProp(name = "cancelText")
    public void setCancelText(String cancelText) {
        tpd.setCancelText(title);
    }

    @ReactProp(name = "accentColor")
    public void setAccentColor(String accentColor) {
        tpd.setAccentColor(Color.parseColor(accentColor));
    }

    @ReactProp(name = "okColor")
    public void setOkColor(String okColor) {
        tpd.setOkColor(Color.parseColor(okColor));
    }

    @ReactProp(name = "cancelColor")
    public void setCancelColor(String cancelColor) {
        tpd.setCancelColor(Color.parseColor(cancelColor));
    }

    @ReactProp(name = "vibrate")
    public void setVibrate(Boolean vibrate) {
        tpd.vibrate(vibrate);
    }

    @ReactProp(name = "enableSeconds")
    public void setEnableSeconds(Boolean enableSeconds) {
        tpd.enableSeconds(enableSeconds);
    }

    @ReactProp(name = "dismissOnPause")
    public void setDismissOnPause(Boolean dismissOnPause) {
        tpd.dismissOnPause(dismissOnPause);
    }

    @ReactProp(name = "themeDark")
    public void setThemeDark(Boolean themeDark) {
        tpd.setThemeDark(themeDark);
    }

    @ReactProp(name = "timeInterval")
    public void setTimeInterval(int hoursInterval, int minutesInterval, int secondsInterval) {
        tpd.setTimeInterval(hoursInterval, minutesInterval, secondsInterval);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        getDialog().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);

        if (enableMinutes == true && enableSeconds == true)
            tpd = TimePickerDialog.newInstance(TimePickerFragment.this, hour, minute, second, is24Hour);
        else 
            tpd = TimePickerDialog.newInstance(TimePickerFragment.this, hour, minute, is24Hour);
     
        tpd.setTitle(title);
        tpd.setOkText(okText);
        tpd.setCancelText(cancelText);

        tpd.vibrate(vibrate);
        tpd.setThemeDark(darkTheme);
        tpd.dismissOnPause(dismissOnPause);
        tpd.enableMinutes(enableMinutes);
        tpd.enableSeconds(enableSeconds);
        tpd.setTimeInterval(hoursInterval, minutesInterval, secondsInterval);

        tpd.setAccentColor(Color.parseColor(accentColor));
        tpd.setOkColor(Color.parseColor(okColor));
        tpd.setCancelColor(Color.parseColor(cancelColor));

        if (minTime != null) {
            Calendar cal1 = Calendar.getInstance();

            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
            try {
                cal1.setTime(sdf.parse(minTime));
            } catch (Exception e) {
                // The handling for the code
            }
            tpd.setMinTime(new Timepoint(cal1.get(Calendar.HOUR_OF_DAY), cal1.get(Calendar.MINUTE),
                    cal1.get(Calendar.SECOND)));
        }
        if (maxTime != null) {
            Calendar cal1 = Calendar.getInstance();

            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
            try {
                cal1.setTime(sdf.parse(maxTime));
            } catch (Exception e) {
                // The handling for the code
            }
            tpd.setMaxTime(new Timepoint(cal1.get(Calendar.HOUR_OF_DAY), cal1.get(Calendar.MINUTE),
                    cal1.get(Calendar.SECOND)));
        }
        if (disabledTimes != null) {
            int size = disabledTimes.size();
            Timepoint[] disabledTimesPicker = new Timepoint[size];

            Log.d("size", Integer.toString(size));
            for (int i = 0; i < size; i++) {
                if (disabledTimes.getMap(i).hasKey("second"))
                    disabledTimesPicker[i] = new Timepoint(disabledTimes.getMap(i).getInt("hour"),
                            disabledTimes.getMap(i).getInt("minute"), disabledTimes.getMap(i).getInt("second"));
                else if (disabledTimes.getMap(i).hasKey("minute"))
                    disabledTimesPicker[i] = new Timepoint(disabledTimes.getMap(i).getInt("hour"),
                            disabledTimes.getMap(i).getInt("minute"));
                else
                    disabledTimesPicker[i] = new Timepoint(disabledTimes.getMap(i).getInt("hour"));

            }

            Log.d("disabledTimesPicker", Arrays.toString(disabledTimesPicker));
            tpd.setDisabledTimes(disabledTimesPicker);
        }

        tpd.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialogInterface) {
                getActivity().getFragmentManager().popBackStackImmediate();
                getDialog().dismiss();            
            }
        });
        tpd.show(getFragmentManager(), "Timepickerdialog");

        return null;
    }

    @Override
    public void onDismiss(DialogInterface dialog) {
        super.onDismiss(dialog);
    }

    @Override
    public void onResume() {
        super.onResume();
        TimePickerDialog tpd = (TimePickerDialog) getFragmentManager().findFragmentByTag("Timepickerdialog");
        if (tpd != null)
            tpd.setOnTimeSetListener(this);
    }

    @Override
    public void onTimeSet(TimePickerDialog view, int hourOfDay, int minute, int second) {
        String hourString = hourOfDay < 10 ? "0" + hourOfDay : "" + hourOfDay;
        String minuteString = minute < 10 ? "0" + minute : "" + minute;
        String secondString = second < 10 ? "0" + second : "" + second;
        String time = "You picked the following time: " + hourString + "h" + minuteString + "m" + secondString + "s";
        callback.invoke(hourString, minuteString, secondString);
        getActivity().getFragmentManager().popBackStackImmediate();
        getDialog().dismiss();
        // getActivity().finish();
    }
}
