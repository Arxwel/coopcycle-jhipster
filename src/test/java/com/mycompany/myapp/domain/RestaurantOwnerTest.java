package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class RestaurantOwnerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestaurantOwner.class);
        RestaurantOwner restaurantOwner1 = new RestaurantOwner();
        restaurantOwner1.setId(1L);
        RestaurantOwner restaurantOwner2 = new RestaurantOwner();
        restaurantOwner2.setId(restaurantOwner1.getId());
        assertThat(restaurantOwner1).isEqualTo(restaurantOwner2);
        restaurantOwner2.setId(2L);
        assertThat(restaurantOwner1).isNotEqualTo(restaurantOwner2);
        restaurantOwner1.setId(null);
        assertThat(restaurantOwner1).isNotEqualTo(restaurantOwner2);
    }
}
