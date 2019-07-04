package com.example.hp.helloworld;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
public class MainActivity extends AppCompatActivity{
    @Override
    protected void onCreate(Bundle saveInstanceState){
        super.onCreate(saveInstanceState);
        setContentView(R.layout.first_layout);
        Button button1 = (Button)findViewById(R.id.button_1);
        button1.setOnClickListener(new View.OnClickListener(){
            @Override
            public  void onClick(View v){
                Intent intent = new Intent(MainActivity.this,SecondActivity.class);
                startActivityForResult(intent,1);
            }
        });
    }
    @Override
    protected void onActivityResult(int requestCode,int resultCode,Intent data){
        switch (requestCode){
            case 1:
                if(resultCode == RESULT_OK){
                    String returnData = data.getStringExtra("data_return");
                    Log.d("SecondActivity",returnData);
                }
                break;
            default:
        }
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        getMenuInflater().inflate(R.menu.main,menu);
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item){
        switch (item.getItemId()){
            case R.id.add_item:
                Toast.makeText(this,"You click Add",Toast.LENGTH_SHORT).show();
                break;
            case R.id.remove_item:
                finish();
                break;
            default:
                break;
        }
        return true;
    }
}
