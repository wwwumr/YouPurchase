package com.example.hp.login;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

public class ItemAdapter extends ArrayAdapter<Goods>{
    private int resourceId;
    public ItemAdapter(Context context,int textViewReouceId,List<Goods> objects){
        super(context,textViewReouceId,objects);
        resourceId = textViewReouceId;
    }
    @Override
    public View getView(int position, View convertView , ViewGroup parent){
        Goods item = getItem(position);
        View view  = LayoutInflater.from(getContext()).inflate(resourceId,parent,false);
        ImageView itemImage = (ImageView) view.findViewById(R.id.item_image);
        TextView itemName = (TextView)view.findViewById(R.id.item_name);
        itemImage.setImageResource(item.getGoodId());
        itemName.setText(item.getName());
        return view;

    }
}