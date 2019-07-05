package com.example.hp.login;

import android.content.Intent;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import org.json.JSONObject;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private EditText editText,editText1;
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button login = (Button) findViewById(R.id.btn_login);
        login.setOnClickListener(this);
        editText = (EditText)findViewById(R.id.et_user_name);
        editText1 = (EditText)findViewById(R.id.et_psw);
    }
    @Override
    public void onClick(View v){
        switch(v.getId()){
            case R.id.btn_login:
                String username=editText.getText().toString();
                String password = editText1.getText().toString();
                Log.i("username",username);
                Log.i("password",password);
                sendRequestWithOkHttp(username,password);
                break;
            default:
                break;
        }
    }
    private void sendRequestWithOkHttp(final String username, final String password){
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    OkHttpClient client = new OkHttpClient();
                    RequestBody requestBody = new FormBody.Builder().add("username",username)
                            .add("password",password).build();
                    Request request = new Request.Builder().url("http://10.166.111.234:8080/login").post(requestBody).build();
                    Response response = client.newCall(request).execute();
                    String responseData = response.body().string();
                    Log.d("responseData",responseData);
                    boolean flag = parseJSONWithJsonObject(responseData);
                    AlertDialog.Builder dialog = new AlertDialog.Builder(MainActivity.this);

                    if(flag) {
                        Log.d("flag","Yes");
                        Intent intent = new Intent(MainActivity.this,SecondActivity.class);
                        startActivity(intent);
                    }else{
                        dialog.setTitle("登录失败");
                        dialog.setMessage("请重新登录");
                        dialog.show();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
    private boolean parseJSONWithJsonObject(String jsonData){
        try{JSONObject node = new JSONObject(jsonData);
        if(node.getString("flag").equals("Yes")) return true;
            else
            return false;
        }catch (Exception e){
            return false;
        }
    }

}
