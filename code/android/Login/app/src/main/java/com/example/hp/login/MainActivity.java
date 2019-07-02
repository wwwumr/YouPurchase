package com.example.hp.login;

import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private EditText editText,editText1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = (Button) findViewById(R.id.btn_login);
        button.setOnClickListener(this);
        editText = (EditText)findViewById(R.id.et_user_name);
        editText1 = (EditText)findViewById(R.id.et_psw);}
    @Override
    public void onClick(View v){
        switch(v.getId()){
            case R.id.btn_login:
                String username=editText.getText().toString();
                String password = editText1.getText().toString();
                AlertDialog.Builder dialog = new AlertDialog.Builder(MainActivity.this);
                if(username.equals("wzy")&&password.equals(("123456"))){
                    dialog.setTitle("登录成功");
                    dialog.setMessage("请进行下一操作");
                    dialog.show();}
                else{
                    dialog.setTitle("登录失败");
                    dialog.setMessage("请重新登录");
                    dialog.show();
                }
                break;
            default:
                break;
        }
    }
}
