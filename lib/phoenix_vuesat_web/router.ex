defimpl Phoenix.HTML.Safe, for: Map do
  def to_iodata(data), do: data |> Poison.encode! |> Plug.HTML.html_escape
end


defmodule PhoenixVuesatWeb.Router do
  use PhoenixVuesatWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end


  # SEO title tags, etc in assigns structure
  pipeline :template_string do
    plug Plugs.Assigns, %{
      home: "Home",
      contact: "Contact",
      sitemap: "Sitemap"
    }
  end


  scope "/", PhoenixVuesatWeb do
    pipe_through [:browser, :template_string]

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PhoenixVuesatWeb do
  #   pipe_through :api
  # end
end
