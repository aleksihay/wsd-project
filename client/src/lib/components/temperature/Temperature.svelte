<script>
  const API_URL = "https://wsd-temperature-api.aalto-opencs.deno.net";

  let temperature = $state();

  const increaseTemperature = async () => {
    const response = await fetch(`${API_URL}/api/temperature`, {
      method: "POST",
    });
    const result = await response.json();
    temperature = Number(result.temperature);
  };
  const decreaseTemperature = async () => {
    const response = await fetch(`${API_URL}/api/temperature`, {
      method: "DELETE",
    });
    const result = await response.json();
    temperature = Number(result.temperature);
  };
  const refreshTemperature = async () => {
    const response = await fetch(`${API_URL}/api/temperature`)
    const result = await response.json();
    temperature = Number(result.temperature);
  };
  $effect(() => {
    refreshTemperature();
  });
</script>

<p>Hello!</p>

<p>Temperature: {temperature}</p>
<button onclick={increaseTemperature}>Increase temperature</button>
<button onclick={decreaseTemperature}>Decrease temperature</button>
<button onclick={refreshTemperature}>Refresh temperature</button>
