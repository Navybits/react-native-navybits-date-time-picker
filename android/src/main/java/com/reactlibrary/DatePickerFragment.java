package com.reactlibrary;

import android.app.DialogFragment;
import android.content.DialogInterface;
import android.os.Bundle;

import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import android.graphics.Color;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;

import com.wdullaer.materialdatetimepicker.date.DatePickerDialog;
import com.wdullaer.materialdatetimepicker.date.DateRangeLimiter;
import com.wdullaer.materialdatetimepicker.time.TimePickerDialog;
import com.wdullaer.materialdatetimepicker.time.Timepoint;

public class DatePickerFragment extends DialogFragment implements DatePickerDialog.OnDateSetListener {

    DatePickerDialog dpd;
    private Callback callback;
    private boolean dismissOnPause, vibrate, darkTheme, autoDismiss, showYearPickerFirst;
    private int year, month, day;
    private String okText, title, cancelText, accentColor, okColor, cancelColor, scrollOrientation;
    private String minDate, maxDate;

    public DatePickerFragment() {
    }


    public DatePickerFragment(ReadableMap options, Callback callback) {

        this.callback = callback;
        final Calendar c = Calendar.getInstance();

        title = options.hasKey("title") ? options.getString("title") : "";
        okText = options.hasKey("okText") ? options.getString("okText") : "OK";
        cancelText = options.hasKey("cancelText") ? options.getString("cancelText") : "CANCEL";
        scrollOrientation = options.hasKey("scrollOrientation") ? options.getString("scrollOrientation") : "horizontal";

        year = options.hasKey("year") ? options.getInt("year") : c.get(Calendar.YEAR);
        month = options.hasKey("month") ? options.getInt("month") : c.get(Calendar.MONTH);
        day = options.hasKey("day") ? options.getInt("day") : c.get(Calendar.DAY_OF_YEAR);

        dismissOnPause = options.hasKey("dismissOnPause") ? options.getBoolean("dismissOnPause") : false;
        vibrate = options.hasKey("vibrate") ? options.getBoolean("vibrate") : false;
        darkTheme = options.hasKey("darkTheme") ? options.getBoolean("darkTheme") : false;
        autoDismiss = options.hasKey("autoDismiss") ? options.getBoolean("autoDismiss") : false;
        showYearPickerFirst = options.hasKey("showYearPickerFirst") ? options.getBoolean("showYearPickerFirst") : false;

        accentColor = options.hasKey("accentColor") ? options.getString("accentColor") : "#ffffff";
        okColor = options.hasKey("okColor") ? options.getString("okColor") : "#ffffff";
        cancelColor = options.hasKey("cancelColor") ? options.getString("cancelColor") : "#ffffff";

        if( options.hasKey("minDate") )
            minDate = options.getString("minDate") ;
        if( options.hasKey("maxDate") )
            maxDate =   options.getString("maxDate") ;



    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        getDialog().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);

        dpd = DatePickerDialog.newInstance(DatePickerFragment.this, year, month, day);

        dpd.setTitle(title);
        dpd.setOkText(okText);
        dpd.setCancelText(cancelText);


        dpd.vibrate(vibrate);
        dpd.dismissOnPause(dismissOnPause);
        dpd.autoDismiss(autoDismiss);
        dpd.showYearPickerFirst(showYearPickerFirst);

        dpd.setAccentColor(Color.parseColor(accentColor));
        dpd.setThemeDark(darkTheme);
        dpd.setOkColor(Color.parseColor(okColor));
        dpd.setCancelColor(Color.parseColor(cancelColor));


        if(minDate!=null){
            Calendar cal1 = Calendar.getInstance();

            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
            try {
                cal1.setTime(sdf.parse(minDate));
            }
            catch (Exception e) {
                //The handling for the code
            }

            dpd.setMinDate(cal1);

        }
        if(maxDate!=null) {
            Calendar cal1 = Calendar.getInstance();

            SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
            try {
                cal1.setTime(sdf.parse(maxDate));
            }
            catch (Exception e) {
                //The handling for the code
            }
            dpd.setMaxDate(cal1);

        }
        Log.d("scrollOrientation", scrollOrientation);
        if (scrollOrientation.equals("horizontal"))
            dpd.setScrollOrientation(DatePickerDialog.ScrollOrientation.HORIZONTAL);
        else if (scrollOrientation.equals("vertical"))
            dpd.setScrollOrientation(DatePickerDialog.ScrollOrientation.VERTICAL);



        dpd.setOnCancelListener(new DialogInterface.OnCancelListener() {
            @Override
            public void onCancel(DialogInterface dialogInterface) {
                getActivity().getFragmentManager().popBackStackImmediate();
                getDialog().dismiss();
          }
        });
        dpd.show(getFragmentManager(), "Timepickerdialog");

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
        if (dpd != null)
            dpd.setOnDateSetListener(this);
    }

    @Override
    public void onDateSet(DatePickerDialog datePickerDialog, int i, int i1, int i2) {
        int dayString = i2;
        //hourOfDay < 10 ? "0" + hourOfDay : "" + hourOfDay;
        int yearString = i;
        //minute < 10 ? "0" + minute : "" + minute;
        int monthString = i1+1;
        //second < 10 ? "0" + second : "" + second;
        String date = "You picked the following date: " + yearString + "h" + monthString + "m" + dayString + "s";
        callback.invoke(yearString, monthString,dayString);
        getActivity().getFragmentManager().popBackStackImmediate();
        getDialog().dismiss();
        // getActivity().finish();
    }


}
