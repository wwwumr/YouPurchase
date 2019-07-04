package com.example.hp.login;

import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
public class FourthActivity extends AppCompatActivity  {
    private EditText editText,editText1,editText2,editText3,editText4;
    private Button button1,button,button2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fourth_layout);
        button = (Button) findViewById(R.id.btn_1);
        button1=(Button)findViewById(R.id.btn_2);
        button2=(Button)findViewById(R.id.btn_0);
        editText = (EditText)findViewById(R.id.tv1);
        editText1 = (EditText)findViewById(R.id.tv3);
        editText2 = (EditText)findViewById(R.id.tv5);
        editText3 = (EditText)findViewById(R.id.tv7);
        editText4 = (EditText)findViewById(R.id.tv9);
        button.setOnClickListener(new ButtonListener());
        button1.setOnClickListener(new ButtonListener());
        button2.setOnClickListener(new ButtonListener());
    }
    private class ButtonListener implements View.OnClickListener{
        public void onClick(View v) {
            editText.setFocusableInTouchMode(true);
            editText1.setFocusableInTouchMode(true);
            editText2.setFocusableInTouchMode(true);
            editText3.setFocusableInTouchMode(true);
            editText4.setFocusableInTouchMode(true);
            editText.setFocusableInTouchMode(true);
            switch(v.getId()) {
                case R.id.btn_1:{
                    button1.setEnabled(true);
                    editText.setFocusable(true);
                    editText.setFocusableInTouchMode(true);
                    editText1.setFocusable(true);
                    editText2.setFocusable(true);
                    editText3.setFocusable(true);
                    editText4.setFocusable(true);
                    break;
                }
                case R.id.btn_0:{
                    button1.setEnabled(false);
                    editText.setFocusable(false);
                    System.out.println("This is ok!");
                    editText1.setFocusable(false);
                    editText2.setFocusable(false);
                    editText3.setFocusable(false);
                    editText4.setFocusable(false);
                    break;
                }
                case R.id.btn_2:{
                    AlertDialog.Builder dialog = new AlertDialog.Builder(FourthActivity.this);
                    dialog.setTitle("修改成功");
                    dialog.setMessage("请进行下一操作");
                    dialog.show();
                    break;
                }
                default:
                    break;
            }
        }
    }

}
