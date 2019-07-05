package com.example.hp.login;

import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.ListViewCompat;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import com.example.hp.login.ItemAdapter;
public class SecondActivity extends AppCompatActivity {

    private TitleLayout titleLayout;
    private List<Goods> goodsList = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.second_layout);
        initGoods();
        ItemAdapter adpater = new ItemAdapter(SecondActivity.this,R.layout.item,goodsList);
        final ListView listView=(ListView) findViewById(R.id.list_view);
        listView.setAdapter(adpater);
        ActionBar actionBar =  getSupportActionBar();
        if(actionBar!=null){
            actionBar.hide();
        }
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener(){
            @Override
            public void onItemClick(AdapterView<?>parent,View view,int position,long id){
                Goods goods = goodsList.get(position);
                Intent intent = new Intent(SecondActivity.this,ThirdActivity.class);
                startActivity(intent);
            }
        });
        titleLayout = (TitleLayout)findViewById(R.id.title);
        titleLayout.titleEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(SecondActivity.this, "You click Edit button!", Toast.LENGTH_SHORT).show();
                Intent intent =new Intent(SecondActivity.this,FourthActivity.class);
                startActivity(intent);
            }
        });

    }
    private void initGoods(){
        for(int i=0;i<2;i++){
            Goods item1 = new Goods("item1",R.drawable.apple_pic);
            goodsList.add(item1);
            Goods item2 = new Goods("item2",R.drawable.banana_pic);
            goodsList.add(item2);
            Goods item3 = new Goods("item3",R.drawable.cherry_pic);
            goodsList.add(item3);
            Goods item4 = new Goods("item4",R.drawable.grape_pic);
            goodsList.add(item4);
            Goods item5 = new Goods("item5",R.drawable.mango_pic);
            goodsList.add(item5);
        }
    }
}