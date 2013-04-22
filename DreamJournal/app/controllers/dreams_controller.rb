class DreamsController < ApplicationController
  def create
    @dream = Dream.create!(params[:dream])
    sleep(0.5);
    respond_to do |format|
      format.json { render :json => @dream }
    end
  end

  def update
    @dream = Dream.find(params[:id])
    p @dream
    @dream.update_attributes(params[:dream])
    @dream.save
    p params
    respond_to do |format|
      format.json { render :json => @dream }
    end
  end

  def index
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => Dream.all }
    end
  end

  def delete
    Dream.find(params[:id]).destroy
  end

  def destroy
    Dream.find(params[:id]).destroy
    render :nothing => true
  end

end
