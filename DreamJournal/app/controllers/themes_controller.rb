class ThemesController < ApplicationController
  #def search
    #respond_to do |format|
   #   format.json { render :json => Theme.all.select{ |t| t.tag =~ "/^#{params[:str]}/" }
  #  end
  #end

  def create

  puts "log issue************"
  puts "#{params[:tag]}"
  puts "#{Theme.find_by_tag(params[:theme][:tag])}"

    result =  Theme.find_by_tag(params[:theme][:tag])

    puts "end issue**************"
    if result != nil
      respond_to do |format|
        format.json { render :json => result}
      end
    else
      @theme = Theme.create!(params[:theme])
      respond_to do |format|
        format.json { render :json => @theme }
      end
    end
  end

  def destroy
  end

  def index
    respond_to do |format|
      format.json { render :json => Theme.all }
    end
  end

  def show
    respond_to do |format|
    format.json { render :json => Dream.find(params[:id]).themes}
    end
  end
end
