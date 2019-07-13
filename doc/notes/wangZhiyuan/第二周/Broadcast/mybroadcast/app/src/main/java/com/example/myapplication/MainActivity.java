package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button=(Button)findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent("com.example.myapplication.MY_BROADCAST");
                Log.d("MainActivity","send info");
                intent.setComponent(new ComponentName("com.example.myapplication",
                        "com.example.myapplication.MyBroadcastReceiver"));
                sendOrderedBroadcast(intent,null);
            }
        });
    }
}