package com.delightfulstudio.wheelpicker;

import android.content.Context;
import android.graphics.Canvas;

import com.aigestudio.wheelpicker.WheelPicker;

public class PatchedWheelPicker extends WheelPicker {

    private boolean mInitialized = false;

    public PatchedWheelPicker(Context context) {
        super(context);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldW, int oldH) {
        super.onSizeChanged( w, h, oldW, oldH );
        mInitialized = true;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        if ( mInitialized )
            super.onDraw( canvas );
    }

}
